import fs from 'fs'
import client from '../tools/mailchimpClient'

// describe('addContacts', () => {
//   beforeEach(() => {
//     // Reset the test data before each test
//     fs.copyFileSync('test-contacts.csv', 'contacts.csv')
//   })

//   afterEach(() => {
//     // Clean up the test data after each test
//     fs.unlinkSync('contacts.csv')
//   })
// })

test('should add contacts to Mailchimp and remove them from the file', async () => {
  const listId = '1144451'
  const batchAdd = jest.spyOn(client.lists, 'addListMember')

  //   await addContacts(apiKey, listId)

  // Verify that the Mailchimp API was called with the correct parameters
  expect(batchAdd).toHaveBeenCalledWith(listId, {
    email_address: 'test1@example.com',
    status_if_new: 'subscribed',
    merge_fields: {
      FNAME: 'Test1',
      LNAME: 'User1',
    },

    update_existing: true,
  })

  // Verify that the file was removed
  //   expect(fs.existsSync('contacts.csv')).toBe(false)
})
