Hi Katie, I'm just writing the guide here for easy access :)

I haven't yet found a way to enable hugo and npm after a restart of your Workspace, we should probably make a Workspace just for this.

[Hugo docs](https://gohugo.io/documentation/)  
To enable Hugo cli open a new terminal in Hugo folder  
```export PATH="/home/coder/bin/:$PATH"```  
Then you start website with  
```hugo server```

[Strapi docs](https://docs.strapi.io/)  
To enable npm (for strapi) open a new terminal in strapi/katiedeforest-api folder  
```\. "$HOME/.nvm/nvm.sh"```  
then you start strapi with  
```npm run develop```