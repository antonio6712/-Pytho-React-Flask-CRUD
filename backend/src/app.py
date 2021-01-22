from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)#esta intancia de mongo me devolvera un objeto para interactuar con al base datos

CORS(app)#cada vez ue envie una peticion se enviaran unas cuantas reglas, para que se comunique con el servidor de react     

db = mongo.db.users #voy a definir la coleccion de usuarios

@app.route('/users', methods=['POST'])#voy a tener una ruta para crear usuarios
def createUser():
    id = db.insert({
        
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
        
    })#de la coleccion de usuarios voy insertar un nuevo datos
    return jsonify(str(ObjectId(id)))# retprnamos el string del ObjectId   

@app.route('/users', methods=['GET'])#voy a tener una ruta para traer usuarios
def getUsers():
    users = []
    for doc in db.find():#por ca objeto que este en al consulta se agregara ala lista
        users.append({
            '_id': str(ObjectId(doc['_id'])), # este objeto lo combertimos en un ObjectId y aun string
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    
    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])#voy a tener una ruta para traer un usuario.
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})# el dato lo vamos abuscar con el _id y que coincida con el id
    print(user)
    return jsonify({
            '_id': str(ObjectId(user['_id'])), # este objeto lo combertimos en un ObjectId y aun string
            'name': user['name'],
            'email': user['email'],
            'password': user['password']
        })

@app.route('/users/<id>', methods=['DELETE'])#voy a tener una ruta para eliminar usuario.
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    print(id)
    return jsonify({'msg': 'usuario eliminado'})

@app.route('/users/<id>', methods=['PUT'])#voy a tener una ruta para actualiazar un usuario.
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set':{# le decimos que el _id que tenmos concuerde con el ObjectId y realizamos una nueva consulta de los datos que se quieran guardar.
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    }})
    print(id)#muestra el usuario que quiero cambiar
    print(request.json)# muestra el cambio
    return jsonify({'msg':'usuario actualizado'})

#iniciar en modo debug
if __name__ == "__main__":
    app.run(debug=True)