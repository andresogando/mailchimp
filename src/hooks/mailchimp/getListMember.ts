import md5 from 'md5'
import { client } from '../../tools'

export async function getListMember(listId: string, email: string) {
  return await client.lists.getListMember(listId, md5(email))
}
