import pymongo


class DBConnect:
    def __init__(self,collection):
        #connect to DB
        MONGO_DB = "stattrack"
        try:
            client = pymongo.MongoClient('mongodb://%s:%s@sip1.dipduo.com:27017/?authSource=admin' % ('dbST', 'MALd23#$kklZ21') )
        except:
            client = pymongo.MongoClient('127.0.0.1',
                                         username   = 'dbST',
                                         password   = 'MALd23#$kklZ21',
                                         authSource ='admin' )

        self.db = client[MONGO_DB]
        if collection:
            self.collection = self.db[collection]


    def collection(self,table): #switch collections (returns collection and stores in object)
        self.collection = self.db[table]
        return self.collection

    def getCollection(self):
        return self.collection

    def checkExists(self,key,value):
        exists = self.collection.find({key:value}) #find all listings with matching key & val
        for x in exists:
            return True
        return False

    def getJSON(self,key=None,value=None): #returns JSON of all files matching inputted attributes
        total = []
        if key and value:
            return self.collection.find({key:value}) #find all listings with matching key & val
        else:
            return self.collection.find() #find all listings in collection

    def getJSONList(self,key=None,value=None): #returns list of documents (dictionary)
        total = []
        if key:
            documents = self.collection.find({key:value}) #find all listings with matching key & val
        else:
            documents = self.collection.find() #find all listings in collection

        for document in documents:
            total.append(document)

        if len(total) == 1:
            return total[0]
        else:
            return total

    def getDict(self,key=None,value=None):
        total = {}
        if key:
            documents = self.collection.find({key:value}) #find all listings with matching key & val
        else:
            documents = self.collection.find() #find all listings in collection


        for document in documents:
            total[document['_id']] = document

        if len(total) == 1:
            for val in list(total):
                return total[val]

        return total

    def update(self,key,data):
        if self.checkExists('_id',key):
            self.collection.update({"_id": key}, data)
        else:
            data['_id'] = key
            self.collection.insert_one(data)



    def getCount(self): #gets count of collection
        docs = self.collection.find()
        total = 0
        for x in docs:
            total+=1
        return total

    def drop(self,key,value): #drops key,value in collection
        return self.collection.delete_one({key:value})

    def set(self,key,value):
        self.collection.update_one(
            {'_id': key },
            { '$set': value}
        )
