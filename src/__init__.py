from flask import Flask, flash, redirect, jsonify, render_template, request, abort, url_for
from . import connect, usercalls,surveycalls
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
def home(error=None):
	info = usercalls.getUser(request.cookies.get('user'))
	if info:
		return render_template('main.html', user=info)

	return render_template('main-unauthenticated.html',error=error)


@app.route('/welcome')
def welcome():
	return render_template('welcome.html')

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


@app.route('/settings')
def settings():
	info = usercalls.getUser(request.cookies.get('user'))
	if info:
		return render_template('edit-user.html',user=info)
	return redirect(url_for(home))


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
				'email': request.form['email'],
				'password': hashpass[1],
				'_login-key': str(hashpass[0]),
				'key': hashpass[0],
				'surveys': []
			}
		)
		return redirect(url_for("home"))

@app.route("/logout")
def logout():
	response = redirect(url_for("home"))
	response.set_cookie('user', '', expires=0)
	return response

@app.route('/login')
def login():
	return render_template('login.html')

@app.route('/dashboard')
def dashboard():
	info = usercalls.getUser(request.cookies.get('user'))
	if info:
		surveys = surveycalls.getSurveys(info['surveys'])

		return render_template('dashboard.html',user=info,surveys=surveys)
	return redirect(url_for('home'))


@app.route('/test')
def test():
	info = usercalls.getUser(request.cookies.get('user'))
	return render_template('test.html',user=info)


#ADD SURVEYS
@app.route('/survey/add')
def addSurvey():
	info = usercalls.getUser(request.cookies.get('user'))
	if info:
		return render_template('addSurvey.html')

@app.route('/survey/add/do', methods=['POST'])
def postSurvey():
	info = usercalls.getUser(request.cookies.get('user'))
	if info:
		questions = request.form['questions']
		addPost = surveycalls.postSurvey(questions,info)
		return redirect(url_for(home({'isError': False, 'msg': 'The post was successfully added','title': 'IT WORKED!'})))

@app.route('/join')
def join():
	return render_template('joinSurvey.html')





if __name__ == '__main__':
	app.run()
