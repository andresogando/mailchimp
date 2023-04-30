import { Router } from 'express'
import { addOne, deleteOne } from '../../hooks/db/members'
import { addListMember } from '../../hooks/mailchimp'
const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const {
      type,
      data: { email, merges, list_id },
    } = req.body

    const { FNAME: firstName, LNAME: lastName } = merges

    console.log(req.body)
    let response
    switch (type) {
      case 'subscribe':
        response = await addOne({
          email,
          firstName,
          lastName,
          list_id,
        })

        break

      case 'unsubscribe':
        response = await deleteOne({
          email,
        })
        break

      default:
        break
    }
    res.send('OK')
  } catch (err) {
    next(err)
  }
})

router.post('/ui/add', async (req, res, next) => {
  const data = req.body

  return await new Promise(async (resolve, reject) => {
    try {
      if (data.length > 0) {
        let response
        for (let i = 0; i < data.length; i++) {
          const current = data[i]

          const user = {
            firstName: current['First name'],
            lastName: current['Last/Organization/Group/Household name'],
            email: current['Email Addresses\\Email address'],
          }

          const addToDB = addOne({
            ...user,
            list_id: process.env.LISTID,
          })

          const addToMailchimp = addListMember(process.env.LISTID, user)

          response = await Promise.all([addToDB, addToMailchimp])
          console.log(response)
        }
        resolve(response)
      }

      // Only Support a List.
      // TODO: support one member.
      // const current = data

      // const user = {
      //   firstName: current['First name'],
      //   lastName: current['Last/Organization/Group/Household name'],
      //   email: current['Email Addresses\\Email address'],
      // }
      res.send('OK')
    } catch (err) {
      reject(err)
    }
  })
})

router.get('/', (req, res, next) => {
  console.log(req.body)
  res.send('OK')
})
router.all('*', (req, res, next) => {
  console.log(req.body)
  res.send('OK')
})

export default router
