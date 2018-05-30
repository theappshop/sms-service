import chai from 'chai'
import chaiHttp from 'chai-http'
import knex from '../src/db/connection'
import server from '../src/index'

const should = chai.should()
chai.use(chaiHttp)

const BASE_URL = '/'

describe('routes : codes', () => {
  before(async function () {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })
  describe(`GET ${BASE_URL}`, () => {
    it('index', (done) => {
      chai.request(server)
        .get(BASE_URL)
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.status.should.eql('success')
          res.body.message.should.eql('@sms sender')
          done()
        })
    })
  })
})
