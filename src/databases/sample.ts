export const ADMIN_ROLE = 'SUPER ADMIN';
export const USER_ROLE = 'NORMAL USER';

export const INIT_PERMISSIONS = [
  {
    _id: '648d1f91a5c8b4d88d4e8f11',
    name: 'Read Users',
    apiPath: '/api/users',
    method: 'GET',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f01',
      email: 'admin@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f01',
      email: 'admin@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f12',
    name: 'Create User',
    apiPath: '/api/users',
    method: 'POST',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f02',
      email: 'moderator@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-02T11:00:00Z',
    updatedAt: '2024-05-02T11:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f02',
      email: 'moderator@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f13',
    name: 'Update User',
    apiPath: '/api/users/:id',
    method: 'PUT',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f03',
      email: 'editor@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-03T12:00:00Z',
    updatedAt: '2024-05-03T12:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f03',
      email: 'editor@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f14',
    name: 'Delete User',
    apiPath: '/api/users/:id',
    method: 'DELETE',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f04',
      email: 'admin@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-04T13:00:00Z',
    updatedAt: '2024-05-04T13:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f04',
      email: 'admin@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f15',
    name: 'Read Posts',
    apiPath: '/api/posts',
    method: 'GET',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f05',
      email: 'user1@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-05T14:00:00Z',
    updatedAt: '2024-05-05T14:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f05',
      email: 'user1@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f16',
    name: 'Create Post',
    apiPath: '/api/posts',
    method: 'POST',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f06',
      email: 'user2@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-06T15:00:00Z',
    updatedAt: '2024-05-06T15:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f06',
      email: 'user2@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f17',
    name: 'Update Post',
    apiPath: '/api/posts/:id',
    method: 'PUT',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f07',
      email: 'user3@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-07T16:00:00Z',
    updatedAt: '2024-05-07T16:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f07',
      email: 'user3@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f18',
    name: 'Delete Post',
    apiPath: '/api/posts/:id',
    method: 'DELETE',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f08',
      email: 'user4@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-08T17:00:00Z',
    updatedAt: '2024-05-08T17:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f08',
      email: 'user4@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f19',
    name: 'Read Comments',
    apiPath: '/api/comments',
    method: 'GET',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f09',
      email: 'user5@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-09T18:00:00Z',
    updatedAt: '2024-05-09T18:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f09',
      email: 'user5@example.com',
    },
  },
  {
    _id: '648d1f91a5c8b4d88d4e8f20',
    name: 'Create Comment',
    apiPath: '/api/comments',
    method: 'POST',
    createdBy: {
      _id: '648d1f91a5c8b4d88d4e8f10',
      email: 'user6@example.com',
    },
    isDeleted: false,
    deletedAt: null,
    createdAt: '2024-05-10T19:00:00Z',
    updatedAt: '2024-05-10T19:00:00Z',
    updatedBy: {
      _id: '648d1f91a5c8b4d88d4e8f10',
      email: 'user6@example.com',
    },
  },
];