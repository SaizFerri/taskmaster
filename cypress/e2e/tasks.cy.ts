import { format } from 'date-fns'
import taskFixtures from '../fixtures/tasks.json'

describe('Task flows', () => {
  it('creates a task', () => {
    cy.visit('/')
    cy.contains('h1', 'TaskMaster')

    cy.get('button').contains('Add task').click()
    createTask()
  })

  it('updates a task', () => {
    cy.visit('/')

    cy.get('button').contains('Add task').click()
    createTask()

    cy.get('[data-test-task-menu]').click()
    cy.get('[data-test-task-menu-edit]').click()

    cy.contains('h2', 'Edit task')

    cy.get('input[name="title"]').type('Changed')

    cy.get('button').contains('Save').click()

    cy.contains('[data-test-task-title]', 'Changed')
  })

  it('removes a task', () => {
    cy.visit('/')

    cy.get('button').contains('Add task').click()
    createTask()

    cy.get('[data-test-task-menu]').click()
    cy.get('[data-test-task-menu-delete]').click()

    cy.get('[data-test-task-confirm-delete]').click()

    cy.get('[data-test-task-title]').should('not.exist')
  })

  it('adds a task in a specific status column', () => {
    cy.visit('/')

    cy.get('[data-test-task-add-inprogress]').click()
    createTask()
    cy.get('[data-test-task-status-inprogress]').should('exist')
  })
})

function createTask() {
  cy.get('input[name="title"]').type(taskFixtures.createTask.title)
  cy.get('textarea[name="description"]').type(taskFixtures.createTask.description)
  cy.get('input[name="dueDate"]').type(taskFixtures.createTask.dueDate)

  cy.get('button').contains('Create').click()

  cy.contains('[data-test-task-title]', taskFixtures.createTask.title)
  cy.contains('[data-test-task-description]', taskFixtures.createTask.description)
  cy.contains(
    '[data-test-task-dueDate]',
    format(new Date(taskFixtures.createTask.dueDate), 'MMMM d, yyyy')
  )
}
