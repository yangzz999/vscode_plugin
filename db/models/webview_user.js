'use strict';
module.exports = (sequelize, DataTypes) => {
  const webview_user = sequelize.define('webview_user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps:false
  });
  webview_user.associate = function(models) {
    // associations can be defined here
  };
  return webview_user;
};