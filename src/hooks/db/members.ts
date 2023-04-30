import { Contact } from '../../interfaces/contact.interface'
import { Member } from '../../models/member.model'

export async function addOne(contact: Contact) {
  const newMember = new Member({
    ...contact,
  })

  return await newMember.save()
}

export async function deleteOne(condition: {}) {
  const deleteMember = await Member.deleteOne(condition)
  return deleteMember.deletedCount
}
