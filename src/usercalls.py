from . import connect
import bcrypt

userdb = connect.DBConnect('users')

def getUser(key):
	global userdb
	if key:
		if userdb.checkExists('_login-key',key):
			data = userdb.getDict('_login-key',key)
			return data
	else:
		return False
def updateUser(info):
	global userdb
	try:
		userdb.update(info['_id'],info)
		return True
	except Exception as err:
		print("UPDATEUSER-ERROR:",err)
		return False

def login(username,password):
	global userdb
	if userdb.checkExists('_username',username): #if user exists
		info = userdb.getDict('_username',username)
		if checkPW(password):
			return info
	return False


def getAdmin(key):
	global userdb

	if userdb.checkExists('_login-key',key):
		data = userdb.getDict('_login-key',key)
		if 'isAdmin' in data:
			if data['isAdmin']:
				return data

	return False

def pullData(cleandates=None):
	data = userdb.getDict()
	if cleandates:
		if type(cleandates) is str:
			cleandates = [cleandates]
		for cleandate in cleandates:
			for x in data:
				if x not in ['user_count', 'user_settings']:
					if not data[x][cleandate] == 'Never':
						temp = data[x][cleandate]
						temp = temp.split(" ")
						temp[0] = temp[0].split("-")
						temp[1] = temp[1].split(".")
						temp[1][0] = temp[1][0].split(":")
						date = temp[0][1] + "/" + temp[0][2] + "/" + temp[0][0].lstrip("20")

						if int(temp[1][0][0]) > 12:
							hr = str(int(temp[1][0][0]) - 12)
							period = " PM"
						else:
							hr = str(int(temp[1][0][0]))
							period = " AM"

						time = hr + ":" + temp[1][0][1] + period
						data[x][cleandate] = date + " " + time
	return data


def getUserBy(var, val):
	global userdb

	if userdb.checkExists(var,val):
		data = userdb.getDict(var,val)
		return data
	else:
		return False


def genHash(password):
	salt = bcrypt.gensalt()

	epw = password.encode('utf-8')

	hashed = bcrypt.hashpw(epw, salt)

	return [salt, hashed]

def checkPW(userdata,password):

	epw = password.encode('utf-8')
	salt = userdata['key']
	hashpass = bcrypt.hashpw(epw, salt)

	if hashpass == userdata['password']:
		return True
	else:
		return False
