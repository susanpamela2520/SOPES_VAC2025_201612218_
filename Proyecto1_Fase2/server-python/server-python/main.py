import server

if __name__=="__main__":

   server.app.run(debug=True, port=4000, host = "0.0.0.0")