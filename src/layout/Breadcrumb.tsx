import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const BreadcrumbComponent: React.FC = () => {
    const location = useLocation();

    // Tạo breadcrumb items dựa trên location.pathname
    const breadcrumbItems = location.pathname.split('/').filter(Boolean).map((path, index, array) => {
        const url = `/${array.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <a href={url}>{path}</a>
            </Breadcrumb.Item>
        );
    });

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <a href="/">Home</a>
            </Breadcrumb.Item>
            {breadcrumbItems}
        </Breadcrumb>
    );
};

export default BreadcrumbComponent;
