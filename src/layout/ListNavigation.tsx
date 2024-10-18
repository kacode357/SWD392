import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const NavigationComponent: React.FC = () => {
    const menu = (
        <Menu>
            <Menu.Item key="1">Submenu 1</Menu.Item>
            <Menu.Item key="2">Submenu 2</Menu.Item>
            <Menu.Item key="3">Submenu 3</Menu.Item>
        </Menu>
    );

    return (
    <div>
            <nav style={{ backgroundColor: '#1e293b', color: 'white', padding: '16px', marginTop: '64px' }}>
            <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', padding: 0 }}>
                <li>
                    <span style={{ position: 'relative' }}>
                        LATEST
                        <div style={{ position: 'absolute', width: '100%', height: '4px', backgroundColor: '#22c55e', marginTop: '4px' }}></div>
                    </span>
                </li>
                <li>
                    <span style={{ position: 'relative' }}>
                        OFFERS
                        <div style={{ position: 'absolute', width: '100%', height: '4px', backgroundColor: '#ef4444', marginTop: '4px' }}></div>
                    </span>
                </li>
                <li>EURO 2024</li>
                <li>UCL</li>
                <li>
                    <Dropdown overlay={menu}>
                        <Button type="text" style={{ color: 'white' }}>
                            CLUB <DownOutlined />
                        </Button>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown overlay={menu}>
                        <Button type="text" style={{ color: 'white' }}>
                            NATIONAL <DownOutlined />
                        </Button>
                    </Dropdown>
                </li>
                <li>PATCHES & PRINTING</li>
                <li>
                    <Dropdown overlay={menu}>
                        <Button type="text" style={{ color: 'white' }}>
                            PRODUCTS <DownOutlined />
                        </Button>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown overlay={menu}>
                        <Button type="text" style={{ color: 'white' }}>
                            PLAYERS <DownOutlined />
                        </Button>
                    </Dropdown>
                </li>
                <li>AUTHENTICS</li>
                <li>
                    <Dropdown overlay={menu}>
                        <Button type="text" style={{ color: 'white' }}>
                            RETRO <DownOutlined />
                        </Button>
                    </Dropdown>
                </li>
            </ul>
        </nav>
    </div>
    );
};

export default NavigationComponent;
