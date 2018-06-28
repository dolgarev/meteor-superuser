import { Meteor } from 'meteor/meteor'

// the code ported from https://atmospherejs.com/peerlibrary/user-extra
// see [https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript]
Meteor.user = function user (userId = Meteor.userId(), fields = {}) {
  if (userId === Object(userId)) {
    fields = userId
    userId = Meteor.userId()
  }
  return userId == null
    ? null
    : Meteor.users.findOne(userId, { fields })
}

Meteor.certainUser = function certainUser (userId, fields = {}) {
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

Meteor.certainUserOrThrow = function certainUserOrThrow (userId, fields = {}, error = 'user-not-found') {
  const user = Meteor.certainUser(userId, fields)
  if (user == null) {
    throw error instanceof Error
      ? error
      : new Meteor.Error(error)
  }
  return user
}

Meteor.currentUser = function currentUser (...args) {
  return Meteor.certainUser(Meteor.userId(), ...args)
}

Meteor.currentUserOrThrow = function currentUserOrThrow (...args) {
  return Meteor.certainUserOrThrow(Meteor.userId(), ...args)
}
