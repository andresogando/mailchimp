import md5 from 'md5'
import { Contact } from '../../interfaces/contact.interface'
import { client } from '../../tools'

export async function addListMember(listId: string, contact: Contact) {
  try {
    const result = await client.lists.setListMember(
      listId,
      md5(contact.email),
      {
        email_address: contact.email,
        merge_fields: {
          FNAME: contact.firstName,
          LNAME: contact.lastName,
        },
        status_if_new: 'subscribed',
        status: 'subscribed',
      },
    )

    return result
  } catch (err) {
    if (err.status === 404) {
      console.error(`This email is not subscribed to this list`, err)
    }

    if (err.status === 400) {
      console.error(err.response.body.detail)
    }
    throw err
  }
}
