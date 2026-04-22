import requests

class HttpClient :
	def __init__(self , base_url:str = ""):
		self.base_url = base_url
	def get(self , endpoint:str , params:dict = None , headers:dict = None):
		url = self.base_url + endpoint
		response = requests.get(url , params = params , headers = headers)
		return self._handle_response(response)
	def post(self , endpoint:str , data:dict = None , headers :dict = None):
		url = self.base_url + endpoint
		response = requests.post(url , json = data , headers = headers)
		return self._handle_response(response)
	def _handle_response(self , response):
		if response.status_code == 200:
			try:
				return response.json()
			except :
				return response.text
		else:
			return{
						"error": response.status_code,
						"message":response.text 
				  }

client = HttpClient("https://jsonplaceholder.typicode.com")


posts = client.get("/posts")
print(posts[0])


new_post = client.post("/posts", data={
    "title": "Hello",
    "body": "Test",
    "userId": 1
})

print(new_post)
