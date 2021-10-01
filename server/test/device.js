process.env.NODE_ENV = 'test'
process.env.ERROR_LOGGING = 'false'

const models = require('../models')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
chai.use(require('chai-like'))
chai.use(require('chai-things'))
const should = chai.should()

chai.use(chaiHttp)

describe('Devices', () => {
    describe('/GET devices', () => {
        it('it should GET all the devices', (done) => {
            chai.request(server)
                .get('/device')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                });
        });
    });

    describe('/POST device', () => {
        it('it should not POST a device without "mac" field', (done) => {
            let device = {
                name: "Wi-Fi роутер Nice Device WE1626",
                typeId: 2
            }
            chai.request(server)
                .post('/device')
                .send(device)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    chai.expect(res.body.errors).to.be.an('array').that.contains.something.like({
                        "code": 400,
                        "category": "form_data",
                        "rule": {
                            "field": "type_id",
                            "required": true
                        }
                    })
                    done()
                })
        })

        it('it should POST a device with all required fields', (done) => {
                let device = {
                    "user_email": "ivanov_p@gmail.com",
                    "mac": "75-F2-20-4D-",
                    "type_id": 2,
                    "name": "IEEE 802.11"
                }
                chai.request(server)
                    .post('/device')
                    .send(device)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('successful').eql(true)
                        res.body.should.have.property('deviceId')
                        done()
                    })
            }
        )

    })

    describe('/GET/:id device', () => {
        it('it should GET a device by the given id', async (done) => {
            const device = await models.device.findOne()
            chai.request(server)
                .get('/device/' + device.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name')
                    res.body.should.have.property('mac')
                    res.body.should.have.property('type')
                    res.body.should.have.property('owner_name')
                    res.body.should.have.property('owner_email')
                    done();
                });
        })
    });
    describe('/PUT/:id device', () => {
        it('it should UPDATE a device given the id', async (done) => {
            const device = await models.device.findOne()
            chai.request(server)
                .put('/device/' + device.id)
                .send({name: "Wifi Router"})
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('successful').eql(true)
                    res.body.device.should.have.property('name').eql("Wifi Router")
                    done()
                })
        })
    })

    describe('/DELETE/:id device', () => {
        it('it should DELETE a device given the id', async (done) => {
            const device = await models.device.findOne()
            chai.request(server)
                .delete('/device/' + device.id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('successful').eql(true)
                    done()
                })
        })
    })
})