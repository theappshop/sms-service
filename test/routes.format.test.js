import chai from 'chai'
import chaiHttp from 'chai-http'
import knex from '../src/db/connection'
import server from '../src/index'

const should = chai.should()
chai.use(chaiHttp)

const BASE_URL = '/api/number/format'

describe('routes : codes', () => {
  before(async function () {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })
  describe(`POST ${BASE_URL}`, () => {
    it('valid number', (done) => {
      chai.request(server)
        .post(BASE_URL)
        .send({
          phoneNumber: '+380672364554'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.phoneNumber.should.eql('+380672364554')
          done()
        })
    })
    it('valid number with country', (done) => {
      chai.request(server)
        .post(BASE_URL)
        .send({
          phoneNumber: '662364554',
          country: 'UA'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.phoneNumber.should.eql('+380662364554')
          done()
        })
    })
    it('invalid number with country', (done) => {
      chai.request(server)
        .post(BASE_URL)
        .send({
          phoneNumber: '732364554',
          country: 'UA'
        })
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.phoneNumber.should.eql('+380662364554')
          done()
        })
    })
  })
})
