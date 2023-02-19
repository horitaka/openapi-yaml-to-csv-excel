import type { ConvertedItems, ConvertedItemsEdited } from '@/@types'

export const sampleOpenApiJson = {
  openapi: '3.0.0',
  paths: {
    '/pets': {
      summary: 'Pets resources',
      description: 'Pets resources description',
      get: {
        summary: 'List all pets',
        description: 'List all pets description',
        operationId: 'listPets',
        tags: ['pets'],
      },
      post: {
        summary: 'Create a pet',
        description: 'Create a pet description',
        operationId: 'createPets',
        tags: ['pets'],
      },
    },
    '/pets/{petId}': {
      summary: 'Pets resources by id',
      description: 'Pets resources by id description',
      get: {
        summary: 'Info for a specific pet',
        description: 'Info for a specific pet description',
        operationId: 'showPetById',
        tags: ['pets'],
      },
    },
  },
}

export const sampleOpenApiJsonUpdated = {
  openapi: '3.0.0',
  paths: {
    '/pets': {
      summary: 'Pets resources update',
      description: 'Pets resources description',
      get: {
        summary: 'List all pets update',
        description: 'List all pets description',
        operationId: 'listPets',
        tags: ['pets'],
      },
      patch: {
        summary: 'Update a pet',
        description: 'Update a pet description',
        operationId: 'updatePets',
        tags: ['pets'],
      },
    },
    '/pets/{petId}': {
      summary: 'Pets resources by id',
      description: 'Pets resources by id description',
      get: {
        summary: 'Info for a specific pet',
        description: 'Info for a specific pet description',
        operationId: 'showPetById',
        tags: ['pets'],
      },
    },
    '/pets2/{petId}': {
      summary: 'Pets2 resources by id',
      description: 'Pets2 resources by id description',
      get: {
        summary: 'Info for a specific pet2',
        description: 'Info for a specific pet2 description',
        operationId: 'showPetById2',
        tags: ['pets2', 'update'],
      },
    },
  },
}

export const sampleOpenApiCsv: ConvertedItems = [
  {
    openapi: '3.0.0',
    path: '/pets',
    summary: 'Pets resources',
    description: 'Pets resources description',
    method: 'get',
    tags: 'pets',
    summaryMethod: 'List all pets',
    descriptionMethod: 'List all pets description',
    operationId: 'listPets',
  },
  {
    openapi: '3.0.0',
    path: '/pets',
    summary: 'Pets resources',
    description: 'Pets resources description',
    method: 'post',
    tags: 'pets',
    summaryMethod: 'Create a pet',
    descriptionMethod: 'Create a pet description',
    operationId: 'createPets',
  },
  {
    openapi: '3.0.0',
    path: '/pets/{petId}',
    summary: 'Pets resources by id',
    description: 'Pets resources by id description',
    method: 'get',
    tags: 'pets',
    summaryMethod: 'Info for a specific pet',
    descriptionMethod: 'Info for a specific pet description',
    operationId: 'showPetById',
  },
]

export const sampleOpenApiCsvEdited: ConvertedItemsEdited = [
  {
    openapi: '3.0.0',
    path: '/pets',
    summary: 'Pets resources update',
    description: 'Pets resources description',
    method: 'get',
    tags: 'pets',
    summaryMethod: 'List all pets update',
    descriptionMethod: 'List all pets description',
    operationId: 'listPets',
    additionalColumn: 'additionalColumn',
  },
  {
    openapi: '3.0.0',
    path: '/pets',
    summary: 'Pets resources',
    description: 'Pets resources description',
    method: 'post',
    tags: 'pets',
    summaryMethod: 'Create a pet',
    descriptionMethod: 'Create a pet description',
    operationId: 'createPets',
  },
  {
    openapi: '3.0.0',
    path: '/pets/{petId}',
    summary: 'Pets resources by id',
    description: 'Pets resources by id description',
    method: 'get',
    tags: 'pets',
    summaryMethod: 'Info for a specific pet',
    descriptionMethod: 'Info for a specific pet description',
    operationId: 'showPetById',
    additionalColumn2: 'additionalColumn2',
  },
]

export const sampleOpenApiCsvUpdated: ConvertedItemsEdited = [
  {
    openapi: '3.0.0',
    path: '/pets',
    summary: 'Pets resources update',
    description: 'Pets resources description',
    method: 'get',
    tags: 'pets',
    summaryMethod: 'List all pets update',
    descriptionMethod: 'List all pets description',
    operationId: 'listPets',
    additionalColumn: 'additionalColumn',
  },
  {
    openapi: '3.0.0',
    path: '/pets',
    summary: 'Pets resources update',
    description: 'Pets resources description',
    method: 'patch',
    tags: 'pets',
    summaryMethod: 'Update a pet',
    descriptionMethod: 'Update a pet description',
    operationId: 'updatePets',
  },
  {
    openapi: '3.0.0',
    path: '/pets/{petId}',
    summary: 'Pets resources by id',
    description: 'Pets resources by id description',
    method: 'get',
    tags: 'pets',
    summaryMethod: 'Info for a specific pet',
    descriptionMethod: 'Info for a specific pet description',
    operationId: 'showPetById',
    additionalColumn2: 'additionalColumn2',
  },
  {
    openapi: '3.0.0',
    path: '/pets2/{petId}',
    summary: 'Pets2 resources by id',
    description: 'Pets2 resources by id description',
    method: 'get',
    tags: 'pets2 update',
    summaryMethod: 'Info for a specific pet2',
    descriptionMethod: 'Info for a specific pet2 description',
    operationId: 'showPetById2',
    additionalColumn2: 'additionalColumn2',
  },
]
