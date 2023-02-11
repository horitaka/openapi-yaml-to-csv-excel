import type { Csv } from '@/@types'

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

export const sampleOpenApiCsv: Csv = [
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
