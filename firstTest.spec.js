/// <reference types="cypress" />


describe('First suite', () => {

    
    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class Name
        cy.get('.input-full-width')

        //by Attribute Name
        cy.get('[placeholder]')

        //by Attribute Name And Value 
        cy.get('[placeholder="Email"]')

        //by Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag Name And Attribute With Value
        cy.get('input[placeholder="Email"]')

        //by Two Different Attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by Tag Name, Attribute with value, ID and Class Name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The Most Recommended Way By Cypress
        cy.get('[data-cy="imputEmail1"]')

    })

    it('Second Test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')


        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
        
    })


    it('Then And Wrap Method', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        //cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        //cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        //cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //Cypress style (not Selenium style)

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emaillabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emaillabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm => {
                const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordSecondText)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
        })

        })
    })
        it('Invoke command', () => {
            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Form Layouts').click()

            //1
            cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

            //2
            cy.get('[for="exampleInputEmail1"]').then( label => {
                expect(label.text()).to.equal('Email address')
            })

            //3
            cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>{
                expect(text).to.equal('Email address')
            })

            cy.contains('nb-card', 'Basic form')
                .find('nb-checkbox')
                .click()
                .find('.custom-checkbox')
                .invoke('attr', 'class')
                //.should('contain', 'checked')
                .then(classValue => {
                expect(classValue).to.contain('checked')
                })
        })

        it.only( 'Assert property', () => {
            cy.visit('/')
            cy.contains('Forms').click()
            cy.contains('Datepicker').click()

            cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
                cy.wrap(input).click()
                cy.get('nb-calendar-day-picker').contains('17').click()
                cy.wrap(input).invoke('prop', 'value').should('contain', 'Dec 17, 2022')
            })
        })
})
