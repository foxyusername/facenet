let express=require('express');
const pool = require('./database');
let app=express();
let cors=require('cors');
let bcrypt=require('bcrypt');
let jwt=require('jsonwebtoken');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/register',(req,res)=>{
  let query="INSERT INTO registration (username,age,email,passcode) VALUES(?,?,?,?)"

  bcrypt.hash(req.body.password,10).then((hashed)=>{    //hashing the password
 console.log(hashed);

pool.query(query,[req.body.username,req.body.age,req.body.email,hashed],(error,result)=>{
 if(error){
    res.send('error');
    console.log(error);
 }else{
  const token=jwt.sign({username : req.body.username},'jswwebtoken',{expiresIn: '10000000m'});
    res.send(token);
    console.log('no what do mean of error there is nothing');
}
})
});
})

app.post('/login',(req,res)=>{
  let query="SELECT * FROM registration WHERE username=?";
  
pool.query(query,[req.body.login_username],(error,result)=>{
if(result.length===0){
  res.json(false);
}else{
  bcrypt.compare(req.body.login_password,result[0].passcode).then((match)=>{
    if(match){
      const token=jwt.sign({id :result[0].id},"jwtsecret",{expiresIn:'10000000m'});
      res.json({auth:true,token:token,result:result});
  }else{
  res.json(false);
  }
console.log(match);
  })
}
})
})

app.post('/createpost',(req,res)=>{
pool.query('INSERT INTO posts(user,description,image) VALUES(?,?,?)',[req.body.username,req.body.description,req.body.image],(error,result)=>{
  if(error){
    console.log(error);
  }else{
    console.log(result);
  }
})
})


app.post('/insertprofile',(req,res)=>{
  pool.query('UPDATE registration set profile_image=? WHERE username=?',[req.body.image,req.body.username],(err,result)=>{
     if(err){
      console.log(err)
     }else{
      console.log(result);
      res.send('updated');
     }
  })

  pool.query('update post_commented set profile_image=? where user=?',[req.body.image,req.body.username],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log('updated profile succesfully');
    }
  })

})
app.post('/getprofile_photos',(req,res)=>{
  pool.query('select profile_image from registration where username=?',[req.body.username],(err,result)=>{
     if(err){
      console.log(err)
     }else{
      res.send(result);
     }
  })
})

app.post('/getprofileposts',(req,res)=>{
  pool.query('select * from posts where user=?',[req.body.username],(error,result)=>{
    if(error){
      console.log(error)
    }else{
      if(result.length>0){
        res.send(result);
      console.log(result);
      }else{
        console.log('lesss than zero')
      }
      
    }
  })
})


app.get('/getposts',(req,res)=>{
  pool.query('select * from posts',(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(result)
      res.send(result);
    }
  })
})


app.post('/userliked', (req, res) => {
  let post_id = req.body.post_id;
  let username = req.body.username;

 pool.query('select * from post_liked where post_id=? and userliked=?',[post_id,username],(err,result)=>{
  if(err){
    console.log(err)
  }else{
    if(result && result.length>0){
    pool.query('delete from post_liked where post_id=? and userliked=?',[post_id,username],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        console.log('deleted data in post_liked succesfully');
      }
    })
    
   pool.query('update posts set likecount=likecount-1 where id=?',[post_id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log('updated data in posts scuccesfully')
    }

  pool.query('select * from posts',(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result);
    }
  })
   })  
  }else{

    pool.query('insert into post_liked (userliked,post_id) values(?,?)',[username,post_id],(err,result)=>{
      if(err){
        console.log(err)
      }else{
        console.log('inserted data in post_liked succesfully');
      }
    })
    
   pool.query('update posts set likecount=likecount+1 where id=?',[post_id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log('updated data in posts scuccesfully')
    }

  pool.query('select * from posts',(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result);
    }
  })
   })
    
  }
  }
 })
});

app.get('/getpost',(req,res)=>{


  pool.query('select * from posts where id=?',[req.query.userId],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result);
    }
  })
})

app.post('/insertcomment',(req,res)=>{
  let comment=req.body.comment;
  let username=req.body.username;
  let post_id=req.body.postId;
  let public_id=req.body.public_id;

  pool.query('insert into post_commented (comment,post_id,user,profile_image) values(?,?,?,?)',[comment,post_id,username,public_id],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log('inserted comment succesfully');
     res.send('inserted succesfully');
    }
  })
})
 
app.get('/getcomments',(req,res)=>{
  pool.query('select * from post_commented where post_id=?',[req.query.userid],(err,result)=>{
  if(err){
    console.log(err)
  }else{
    console.log(result);
    res.send(result);
  }
  })
})

app.post('/deletecomment',(req,res)=>{

  pool.query('select * from post_commented where id=? and user=?',[req.body.commentId,req.body.username],(err,result)=>{
    if(result.length>0){
    
  pool.query('delete from post_commented where id=?',[req.body.commentId],(err,result)=>{
    if(err){
      console.log(err)
  }else{

    console.log('it was you comment so i deleted it');
    console.log('deleted row of id  '+req.body.commentId);
   
    
  }
})

    }else{
      console.log('not your comment')
  }

  })

  pool.query('select * from post_commented where post_id=?',[req.body.postId],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      //console.log(result)
      res.send(result);
    }
  
  })


})

app.get('/getaddedcomments',(req,res)=>{
  pool.query('select * from post_commented where post_id=?',[req.query.userid],(err,result)=>{
   if(err){
    console.log(err)
   }else{
    res.send(result);
   }
  })
})
app.post('/updatebio',async (req,res)=>{
  let bio=req.body.bio;
  let username=req.body.username;

 pool.query('update registration set bio=? where username=?',[bio,username],(err,result)=>{
    if(err){
      console.log(err)
    }else{
     console.log('updated registration set new bio');
     res.send('succes');
    }
  })

})

app.get('/getbio',(req,res)=>{
  let username=req.query.username;
  
  console.log('username is '+username);
  console.log('right');

 pool.query('select bio from registration where username=?',[username],(err,result)=>{
  if(err){
    console.log(err)
  }else{
    res.send(result);
    console.log(result);
  }
 })

})

app.get('/getmybio',(req,res)=>{
  let username=req.query.username;
  
  console.log('username is '+username);
  console.log('right');

 pool.query('select bio from registration where username=?',[username],(err,result)=>{
  if(err){
    console.log(err)
  }else{
    res.send(result);
    console.log(result);
  }
 })

})

app.post('/delete',(req,res)=>{
  console.log(req.body.username);
  pool.query('update registration set bio=? where username=?',[req.body.bio,req.body.username],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log('deleted succesfully');
   res.send('deleted succesfully');
    }
  })
})

app.get('/getdeletedbio',(req,res)=>{
  let username=req.query.username;

 pool.query('select bio from registration where username=?',[username],(err,result)=>{
  if(err){
    console.log(err)
  }else{
    res.send(result);
    console.log(result);
  }
 })

})

app.listen(3000,()=>{console.log('server runnign on port 3000...')});