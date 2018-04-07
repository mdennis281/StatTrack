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
