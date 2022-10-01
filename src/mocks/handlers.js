import { rest } from 'msw'

export const handlers = [
  rest.put('http://localhost:9090/skill-tracker/api/v1/engineer/update-profile/*', (req, res, ctx) => {
    return res(
      ctx.json({ ...req.body })
    )
  }),
  rest.post('http://localhost:9090/skill-tracker/api/v1/engineer/add-profile', (req, res, ctx) => {
    return res(
      ctx.json({ ...req.body })
    )
  }),
]