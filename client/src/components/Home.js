import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { Table } from 'antd';

import { MainLayout } from './../containers';

const Home = (props) => {
  const data = props.data || {};
  const { loading, allUsers } = data;
  const users = allUsers || [];

  const columns = [{
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Admin',
    dataIndex: 'isAdmin',
    key: 'isAdmin',
  }];

  const dataSource = users.map((user) => {
    const {
      id, name, email, isAdmin,
    } = user;
    return {
      key: id, name, email, isAdmin,
    };
  });

  return (
    <MainLayout>
      <div>
        { loading &&
          <p>Loading ..</p>
        }
        { allUsers && allUsers.length === 0 &&
          <p>Sem users cadastrado</p>
        }
        { allUsers && allUsers.length &&
          <Table dataSource={dataSource} columns={columns} />
        }
      </div>
    </MainLayout>
  );
};

Home.propTypes = {
  data: PropTypes.shape({
    allUsers: PropTypes.array,
    loading: PropTypes.bool,
  }),
};

Home.defaultProps = {
  data: {},
};

const Users = gql`
  query Users {
    allUsers {
      id
      name
      email
      isAdmin
    }
  }
`;

export default graphql(Users)(Home);

