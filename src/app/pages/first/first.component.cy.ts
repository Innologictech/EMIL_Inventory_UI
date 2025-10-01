import { FirstComponent } from './first.component'

describe('FirstComponent', () => {
  it('should mount', () => {
    cy.mount(FirstComponent)
  })
})