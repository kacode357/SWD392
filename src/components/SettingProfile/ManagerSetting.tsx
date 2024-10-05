import { useState } from 'react';
import { Tabs } from 'antd';           // Import Tabs from antd
import Setting from './Setting';       // Import the Setting component
import ChangePassword from './ChangePassword'; // Import the ChangePassword component

const { TabPane } = Tabs;              // Destructure TabPane from Tabs

const ManagerSetting = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('activeUsers');  // Default tab key

  return (
    <div className="manager-setting">
      {/* Use Tabs from antd */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        tabBarStyle={{ borderBottom: '1px solid #e8e8e8', textAlign: 'left' }} // Căn trái cho tab bar
      >
        {/* Tab navigation */}
        <TabPane
          tab={
            <span
              className={`${activeTab === 'activeUsers'
                ? 'text-green-500'
                : 'text-black'
                } hover:text-green-500`}
            >
              Active Users
            </span>
          }
          key="activeUsers"
        >
          <Setting />  {/* Render Active Users component */}
        </TabPane>
        <TabPane
          tab={
            <span
              className={`${activeTab === 'deletedUsers'
                ? 'text-green-500'
                : 'text-black'
                } hover:text-green-500`}
            >
              Deleted Users
            </span>
          }
          key="deletedUsers"
        >
          <ChangePassword />  {/* Render Deleted Users component */}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ManagerSetting;
