import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import React from "react";
import DemoPageLinks from "../components/DemoPageLinks";
import Header from "../components/Header";
import getAbsoluteURL from "../utils/getAbsoluteURL";

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
};

interface DemoProps {
  favoriteColor: string;
}

const Demo: React.FC<DemoProps> = ({ favoriteColor }) => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Example: SSR + data fetching with ID token</h3>
          <p>
            This page requires authentication. It will do a server-side redirect
            (307) to the login page if the auth cookies are not set.
          </p>
          <p>Your favorite color is: {favoriteColor}</p>
        </div>
        <DemoPageLinks />
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  // Optionally, get other props.
  const token = await AuthUser.getIdToken();
  const endpoint = getAbsoluteURL("/api/example", req);
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data
      )}`
    );
  }
  return {
    props: {
      favoriteColor: data.favoriteColor,
    },
  };
});

export default withAuthUser<DemoProps>({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Demo);
