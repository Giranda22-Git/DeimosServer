extends Control

const URL = 'http://localhost:3000/users'

func _ready():
	pass
	
func newUser(Login, Password):
	var data_to_send = {
		"Login": Login,
		"Password": Password
	}
	var query = JSON.print(data_to_send)
	var headers = ["Content-Type: application/json"]
	$HTTPRequest.request(URL, headers, false, HTTPClient.METHOD_POST, query)

func _on_Send_pressed():
	var Login = get_node("input_Registration_Login")
	var Password = get_node("input_Registration_Password")
	newUser(Login.text, Password.text)
