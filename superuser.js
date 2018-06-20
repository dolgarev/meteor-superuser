import { Meteor } from 'meteor/meteor'

// the code ported from https://atmospherejs.com/peerlibrary/user-extra
// see [https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript]
Meteor.user = function (userId = Meteor.userId(), fields = {}) {
  if (userId === Object(userId)) {
    fields = userId
    userId = Meteor.userId()
  }
  return userId == null
    ? null
    : Meteor.users.findOne(userId, { fields })
}

Meteor.certainUser = function (userId, fields = {}) {
  let selector
  if (Array.isArray(fields)) {
    selector = fields.reduce((m, v) => {
      m[v] = 1
      return m
    }, {})
  } else {
    selector = fields
  }
  return Meteor.user(userId, selector)
}

Meteor.currentUser = function (...args) {
  return Meteor.certainUser(Meteor.userId(), ...args)
}
