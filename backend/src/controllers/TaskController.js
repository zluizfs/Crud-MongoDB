const Tasks = require("../models/Tasks")
const ObjectId = require("mongodb").ObjectId;

async function findOne(req, res){
  const id = req.params.id;

  try {
    const task = await Tasks.findOne({ _id: new ObjectId(id) });

    res.status(200).json({ task })

  } catch (err){
    res.status(400).json({ error: 'Encontramos um erro ao realizar a busca.' })
  }
}

async function findAll(req, res){
  try {
    const tasks = await Tasks.find({});

    res.status(200).json({ tasks })

  } catch (err){
    res.status(400).json({ error: 'Encontramos um erro ao realizar a busca.' })
  }

}

async function create(req, res){

  const { name, description, priority, limitDate } = req.body;

  try {
    const task = await Tasks.create({
      name: name,
      description: description,
      priority: priority,
      limitDate: limitDate,
      status: false,
    });

    res.status(201).json({ task })

  } catch (err){
    res.status(400).json({ error: 'Encontramos um erro ao criar a tarefa.' })
  }

}

async function update(req, res){
  const id = req.params.id;
  const type = req.params.type;

  const { name, description, priority, limitDate } = req.body;

  try {
    
    if(type === 'update'){
      await Tasks.updateOne({ _id: new ObjectId(id) }, { 
        name: name,
        description: description,
        priority: priority,
        limitDate: limitDate
      });
      
      res.status(200).json({ success: 'Tarefa atualizada com sucesso!'})
    }

    if(type === 'complete'){
      await Tasks.updateOne({ _id: new ObjectId(id) }, {  
        status: true
      });

      res.status(200).json({ success: 'Tarefa foi marcada como concluída!' })
    }


  } catch (err){
    console.log(err)
    res.status(400).json({ error: 'Encontramos um erro ao atualizar a tarefa!' })
  }
}

async function destroy(req, res){
  const id = req.params.id;

  try {
    await Tasks.deleteOne({ _id: new ObjectId(id) });

    res.status(200).json({ success: 'Tarefa excluída com sucesso!' })

  } catch (err){
    res.status(400).json({ error: 'Encontramos um erro ao deletar a tarefa!' })
  }
}

module.exports = {
  findOne,
  findAll,
  create,
  update, 
  destroy
}