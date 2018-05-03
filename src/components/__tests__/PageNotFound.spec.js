import React from 'react'
import PageNotFound from './../PageNotFound'
import { shallow } from 'enzyme'

test('it expects text with not found pathname', () => {
  const pathname = '/lost-page'
  const component = shallow(
    <PageNotFound location={{ pathname }}>Facebook</PageNotFound>,
  )

  expect(component).toMatchSnapshot()

  expect(component.find('p').text()).toContain(pathname)
})
