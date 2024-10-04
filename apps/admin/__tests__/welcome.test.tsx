import { render, screen } from '@testing-library/react'
import Welcome from '@/app/(protected)/welcome/page'

describe('Welcome', () => {
    it('render', () => {
        render(<Welcome />)
        const linkElement = screen.getByText("Get Started")
        expect(linkElement).toBeInTheDocument()
    })
})