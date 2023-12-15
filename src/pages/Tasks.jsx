import React, { useEffect } from "react";

import Layout from "../components/Layout";
import TaskList from "../components/TaskList";

const Tasks = () => {
  return (
    <Layout>
      <TaskList userID={"6550da34a2e08ab6e5f80147"} />
    </Layout>
  );
};

export default Tasks;
