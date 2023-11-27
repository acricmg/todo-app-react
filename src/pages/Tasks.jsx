import React from "react";

import TaskList from "../components/TaskList";
import Layout from "../components/Layout";

const Tasks = () => {
  return (
    <Layout>
      <TaskList userId={"655f6311b209483dd4225cd7"} />
    </Layout>
  );
};

export default Tasks;