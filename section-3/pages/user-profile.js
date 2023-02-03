const UserProfile = (props) => {
  return <h1>{props.username}</h1>;
};

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;

  console.log("ServerSideCode");

  return {
    props: {
      username: "Yun",
    },
  };
};

export default UserProfile;
