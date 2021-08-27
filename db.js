const Sequelize = require('sequelize')
const {STRING, TEXT} = Sequelize
const faker = require('faker')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_react')

const Member = conn.define('member', {
    name: STRING,
    bio: TEXT
}, {
    hooks: {
        beforeCreate: function (member) {
            if(!member.bio) {
                member.bio = `${member.name}'s bio: ${faker.lorem.paragraphs(3)}`
            }
        }
    }
})

const syncAndSeed = async () => {
    await conn.sync({ force: true })
    const [moe, lucy, larry, curly, henry] = await Promise.all([
        Member.create({name: 'moe'}),
        Member.create({name: 'lucy'}),
        Member.create({name: 'larry'}),
        Member.create({name: 'curly'}),
        Member.create({name: 'henry'}),
    ])
}

module.exports = {
    models: {
        Member
    },
    syncAndSeed
}