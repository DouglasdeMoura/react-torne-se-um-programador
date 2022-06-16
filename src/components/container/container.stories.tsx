import { ComponentMeta } from '@storybook/react'

import { Container, Footer, Header, Main, Section } from './container'

export default {
  title: 'Components/Container',
  component: Container,
} as ComponentMeta<typeof Container>

export const Default = () => (
  <Container>
    <Header>Header</Header>
    <Main>Main</Main>
    <Section>Section</Section>
    <Section>Section</Section>
    <Footer>Footer</Footer>
  </Container>
)

export const Fluid = () => (
  <Container fluid>
    <Header fluid>Header</Header>
    <Main fluid>Main</Main>
    <Section fluid>Section</Section>
    <Section fluid>Section</Section>
    <Footer fluid>Footer</Footer>
  </Container>
)
