import React from "react";
import CustomerList from "../components/CustomerList";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Head from "next/head";
import { withSSRContext } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Image from "next/image";
import { mainLogo } from "../public/imageIndex";

function Admin({ signOut, user }) {
  return (
    <main className="flex flex-col w-screen text-xl md:text-2xl">
      {/* Nav Bar with title + sign in, the bar will stick to the top of the screen*/}
      <nav className="sticky top-0 z-20 flex items-center justify-center w-full h-16 bg-white md:h-24">
        <div className="flex items-center justify-between w-11/12 md:w-5/6 max-w-7xl">
          {/* logo and title */}
          <div className="flex gap-2">
            <Image src={mainLogo} />
            <h1 className="text-3xl font-bold md:text-5xl">Contactoo</h1>
          </div>
          {/* Greeting Message */}
          {/* "user" is an object that contains the user information fetched from Amazon Cognito and passed in by withAuthenticator(). */}
          <p>Hello, {user.username}</p>
          {/* <p>Hello, admin!</p> */}
          {/* sign in button */}
          <button
            className="flex items-center justify-center h-10 p-3 text-white bg-black hover:bg-cyan-300 md:h-12 md:p-5 rounded-2xl"
            onClick={signOut}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* third pane with all the customer tickets */}
      <div className="flex flex-col w-full">
        {/* top section of the pane that labels the pane as 'All Tickets' + name of each column */}
        <div className="flex flex-col justify-center w-full h-1/5 max-h-52 ">
          {/* all tickets title */}
          <div className="w-full border-b border-gray-500 h-1/2 max-h-24 p-9">
            All tickets
          </div>

          {/* names of columns  */}
          <div className="flex w-full border-b border-gray-500 justify-evenly h-1/2 max-h-28 pt-9 pb-9 pl-9">
            <div className="flex items-center justify-center w-1/6">Customer</div>
            <div className="flex items-center justify-center w-2/6">Subject</div>
            <div className="flex items-center justify-center w-1/6">Status</div>
            <div className="flex items-center justify-center w-1/6">Chat</div>
          </div>
        </div>

        {/* customer tickets list */}
        <CustomerList user={user} />
      </div>
    </main>
  );
}

// Server-side rendering, only use in pages and not components, used to get db messages to pass into CHAT component
// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export async function getServerSideProps({ req }) {
  console.log("In getServerSideProps(): ");

  // wrap the request in a withSSRContext to use Amplify functionality serverside.
  const SSR = withSSRContext({ req });

  try {
    // currentAuthenticatedUser() will throw an error if the user is not signed in.
    const currentUser = await SSR.Auth.currentAuthenticatedUser();

    // List the users in the Amazon Cognito user pool.
    const ListUsers = {
      AttributesToGet: ["string"],
      Filter: [""],
    };

    // If we make it passed the above line, that means the user is signed in.
    const response = await SSR.API.graphql({
      query: listMessages,
      variables: messageDetail,
      // use authMode: AMAZON_COGNITO_USER_POOLS to make a request on the current user's behalf
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    console.log("Successfully got the user authentication information.");
    // return all the messages from the dynamoDB
    return {
      props: {
        messages: response.data.listMessages.items,
      },
    };
  } catch (error) {
    // We will end up here if there is no user signed in.
    // We'll just return a list of empty messages.
    console.log("error in getServerSideProps()", error);
    return {
      props: {
        messages: [],
      },
    };
  }
}

export default withAuthenticator(Admin);
