import React, { useEffect, useState } from "react";
import { Table, Avatar } from "antd";
import { getAllUserApi } from "../../util/api";
import ToggleStatusButton from "./ToggleStatusButton";
import RoleSelect from "./RoleSelect";
import EditAction from "./EditAction";

interface User {
  id: number;
  email: string;
  userName: string;
  roleName: string;
  status: boolean;
  imgUrl: string;
}

const UserComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const data = {
      pageNum: 1,
      pageSize: 10,
      keyWord: "",
      role: "all",
      status: true,
      is_Verify: true,
      is_Delete: false,
    };
    const response = await getAllUserApi(data);
    setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
      key: "roleName",
      render: (roleName: string, record: User) => (
        <RoleSelect
          role={roleName}
          userId={record.id}
          refreshUsers={fetchUsers}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: User) => (
        <ToggleStatusButton
          status={status}
          userId={record.id}
          refreshUsers={fetchUsers}
        />
      ),
    },
    {
      title: "Avatar",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (imgUrl: string) => <Avatar src={imgUrl} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <EditAction userId={record.id} refreshUsers={fetchUsers} />
      ),
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="id" />;
};

export default UserComponent;
