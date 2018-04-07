from flask import Flask, flash, redirect, jsonify, render_template, request, abort, url_for
from . import connect, usercalls
import ast
import threading
import datetime
import time as t

app = Flask(__name__)

#config
app.config.update(
	DEBUG=True,
	SECRET_key = '12345'
)

@app.route('/')
def home():
<<<<<<< HEAD
	newLogin=0
	info = usercalls.getUser(request.cookies.get('user'))
	if info:
		shadow = usercalls.getAdmin(request.cookies.get('shadow')) #checks to see if admin is attempting to shadow
		if request.cookies.get('newLogin') == "1":
			newLogin = 1 #for the "welcome to cryptotrack" notification

		return render_template('main.html', user=info, shadow=shadow, newLogin=newLogin)

	return render_template('main-unauthenticated.html')

@app.route('/welcome')
def welcome():
	print "hello"
=======
	info = usercalls.getUser(request.cookies.get('user'))
	if info:
		return render_template('main.html', user=info)

	return render_template('main-unauthenticated.html')


@app.route('/welcome')
def welcome():
	return "hello"
>>>>>>> michael

@app.route('/login/do', methods=['POST'])
def login_handle():
	username = request.form['username']
	password = request.form['password']

	userdb = connect.DBConnect('users')

	if userdb.checkExists('_username',username): #if user exists
		info = userdb.getJSONList('_username',username)

		if usercalls.checkPW(info,password): #if correct password
			col = userdb.getCollection()

			col.update_one({'_username': username}, {'$set': { 'lastLogin': str(datetime.datetime.now()) }})

			response = redirect(url_for("home"))
			response.set_cookie('user', info['_login-key'])
			response.set_cookie('newLogin', "1", expires=t.time()+60)

			return response

		else: #incorrect password
			return redirect(url_for('home'))
	else:
		return redirect(url_for('home'))


@app.route('/signup/do', methods=['POST'])
def signup_handle():

	if (request.form['username'] == ""):
		return home("Username Required")
	elif (request.form['email'] == ""):
		return home("Email Required")
	elif (request.form['password'] == ""):
		return home("Password Required")
	elif (request.form['password'] != request.form['pw-confirm']):
		return home("Passwords do not Match")
	else:
		userdb = connect.DBConnect("users")
		col = userdb.getCollection()
		count = userdb.getJSONList("_id","user_count")['count']
		col.update_one({'_id': 'user_count'}, {'$inc': {'count': 1}})
		hashpass = usercalls.genHash(request.form['password'])
		col.insert_one(
			{
				'_id': count,
				'_username': request.form['username'],
				'password': hashpass[1],
				'_login-key': str(hashpass[0]),
				'key': hashpass[0],
				'isAdmin': False,
				'isInvestor': False,
				'created': str(datetime.datetime.now()),
				'email': request.form['email'],
				'lastLogin': 'Never',
				'status': {'icon': 'fas fa-child','title':'Normal','class':'text-light'},
				'defaults': {'exchange': 'BINC'}
			}
		)
		return redirect(url_for("home"))



@app.route("/logout")
def logout():
	response = redirect(url_for("home"))
	response.set_cookie('user', '', expires=0)
	return response


if __name__ == '__main__':
	app.run()
