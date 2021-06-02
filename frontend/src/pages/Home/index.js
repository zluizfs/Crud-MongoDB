import React, { useContext, useEffect, useState } from 'react';
import {
  Container, DialogActions, DialogContent, MenuItem, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Typography
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

import DialogBox from '../../components/DialogBox';
import PageTitle from '../../components/PageTitle';
import TheButton from '../../components/TheButton';
import SubTitle from '../../components/SubTitle';
import TheDatePicker from '../../components/TheDatePicker';

import { SnackContext } from '../../contexts/SnackContext';

import api from '../../services/api';

import './index.css';

export default function Home() {
  const { setSnack } = useContext(SnackContext);

  const [handleTask, setHandleTask] = useState(false);
  const [handleEditTask, setHandleEditTask] = useState(false);
  const [handleCompleteTask, setHandleCompleteTask] = useState(false);
  const [handleDeleteTask, setHandleDeleteTask] = useState(false);

  const [limitDate, setLimitDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');

  const [status, setStatus] = useState(0);

  useEffect(() => {
    document.title = "Minhas Tarefas / My Tasks"

    setTimeout(async () => {
      const response = await api.get('/');
      setTasks(response.data.tasks);
    }, 500);

  }, [status]);

  const validationSchema = yup.object({
    name: yup.string()
      .required(true),
    priority: yup.string()
      .required(true),
  });

  const task = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      description: '',
      priority: '',
    },
    onSubmit: (values) => {
      handleCreate(values);
    },
  });

  const taskEdit = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      description: '',
      priority: '',
    },
    onSubmit: (values) => {
      handleEdit(values);
    },
  });

  async function handleCreate(values) {
    try {

      await api.post('/', { ...values, limitDate });
      setSnack({ message: 'Tarefa criada com sucesso!', type: 'success', open: true });
      setStatus(status + 1);
      setHandleTask(false);
      task.resetForm();
    } catch (err) {
      setSnack({ message: `${err.response.data.error}`, type: 'error', open: true });
    }
  }


  async function handleEdit(values) {
    try {
      await api.put(`/${currentTask._id}/update`, { ...values, limitDate });
      setSnack({ message: 'Tarefa editada com sucesso!', type: 'success', open: true });
      setStatus(status + 1);
      setHandleEditTask(false);
      taskEdit.resetForm();
    } catch (err) {
      setSnack({ message: `${err.response.data.error}`, type: 'error', open: true });
    }
  }

  async function handleComplete() {
    try {
      await api.put(`/${currentTask._id}/complete`);
      setSnack({ message: 'Tarefa foi marcada como concluída!', type: 'success', open: true });
      setStatus(status + 1);
      setHandleCompleteTask(false);
    } catch (err) {
      setSnack({ message: `${err.response.data.error}`, type: 'error', open: true });
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/${currentTask._id}`);
      setSnack({ message: 'Tarefa foi removida com sucesso!', type: 'success', open: true });
      setStatus(status + 1);
      setHandleDeleteTask(false);
    } catch (err) {
      setSnack({ message: `${err.response.data.error}`, type: 'error', open: true });
    }
  }

  // FORMATA DATA DO CALENDÁRIO EM FORMA DE DIA, MêS E ANO (01/01/2021)
  function formatDate(values) {
    var d = new Date(values);
    d = new Date(d.getTime() + d.getTimezoneOffset() * 60000)

    var month = '' + (d.getMonth() + 1);
    var day = '' + (d.getDate());
    var year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
  }

  // FORMATA STATUS
  function formatStatus(values) {
    if (values === true) {
      return 'Concluída'
    }

    return 'Não concluída'
  }


  return (
    <div>
      <Container>
        <PageTitle
          title="My Tasks - Cadastro de tarefas"
          subtitle="Aqui você poderá realizar o cadastro de suas tarefas do dia a dia para organização pessoal."
        />

        <Paper elevation={3} className="table">
          <TableContainer >
            <div className="table-head">
              <Typography
                className="table-head-title"
                variant="h6" id="tableTitle"
                component="div"
              >
                Tarefas Cadastradas
            </Typography>
              <div className="table-head-btn">
                <TheButton
                  variant="contained"
                  onClick={() => setHandleTask(true)}
                >
                  Nova Tarefa
                </TheButton>
              </div>
            </div>
            <Table
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Data Limite</TableCell>
                  <TableCell>Prioridade</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map(task => (
                  <TableRow key={task._id}>
                    <TableCell component="th" scope="row">{task.name}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{formatDate(task.limitDate)}</TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{formatStatus(task.status)}</TableCell>
                    <TableCell align="right">
                      <TheButton
                        onClick={() => {
                          setHandleCompleteTask(true);
                          setCurrentTask(task)
                        }}
                        disabled={task.status === true}
                      >
                        <CheckIcon />
                      </TheButton>
                      <TheButton
                        onClick={() => {
                          setHandleEditTask(true);
                          setCurrentTask(task);
                          taskEdit.setFieldValue('name', task.name);
                          taskEdit.setFieldValue('description', task.description);
                          taskEdit.setFieldValue('priority', task.priority);
                          setLimitDate(task.limitDate)
                        }}
                        disabled={task.status === true}
                      >
                        <EditIcon />
                      </TheButton>
                      <TheButton
                        onClick={() => {
                          setHandleDeleteTask(true);
                          setCurrentTask(task)
                        }}>
                        <DeleteIcon />
                      </TheButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* Cria Tarefa */}
      <DialogBox
        open={handleTask}
        onClose={() => setHandleTask(false)}
        title="Cadastro de Tarefas"
      >
        <form onSubmit={task.handleSubmit}>
          <DialogContent>
            <div className="create-task">
              <SubTitle
                title="Dados da Tarefa"
              />
              <div className="input-block">
                <TextField
                  name="name"
                  label="Título"
                  variant="outlined"
                  value={task.values.name}
                  onChange={task.handleChange}
                  error={task.touched.name && Boolean(task.errors.name)}
                  fullWidth
                />
              </div>
              <div className="input-block">
                <TextField
                  name="description"
                  label="Descrição"
                  variant="outlined"
                  value={task.values.description}
                  onChange={task.handleChange}
                  error={task.touched.description && Boolean(task.errors.description)}
                  multiline
                  rows={4}
                  fullWidth
                />
              </div>
              <div className="input-block">
                <TextField
                  select
                  name="priority"
                  label="Prioridade"
                  variant="outlined"
                  value={task.values.priority}
                  onChange={task.handleChange}
                  error={task.touched.priority && Boolean(task.errors.priority)}
                  fullWidth
                >
                  <MenuItem value="Alta">Alta</MenuItem>
                  <MenuItem value="Média">Média</MenuItem>
                  <MenuItem value="Baixa">Baixa</MenuItem>
                </TextField>
              </div>
              <div className="input-block">
                <TheDatePicker
                  label="Data Limite"
                  value={limitDate}
                  onChange={(e) => setLimitDate(e)}
                  fullWidth
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <TheButton
              onClick={() => {
                setHandleTask(false);
                task.resetForm()
              }}>
              Cancelar
                </TheButton>
            <TheButton
              type="submit"
            >
              Salvar
              </TheButton>
          </DialogActions>
        </form>
      </DialogBox>

      {/* Edita Tarefa */}
      <DialogBox
        open={handleEditTask}
        onClose={() => setHandleEditTask(false)}
        title={`Editando ${currentTask.name}`}
      >
        <form onSubmit={taskEdit.handleSubmit}>
          <DialogContent>
            <div className="create-task">
              <SubTitle
                title="Dados da Tarefa"
              />
              <div className="input-block">
                <TextField
                  name="name"
                  label="Título"
                  variant="outlined"
                  value={taskEdit.values.name}
                  onChange={taskEdit.handleChange}
                  error={taskEdit.touched.name && Boolean(task.errors.name)}
                  fullWidth
                />
              </div>
              <div className="input-block">
                <TextField
                  name="description"
                  label="Descrição"
                  variant="outlined"
                  value={taskEdit.values.description}
                  onChange={taskEdit.handleChange}
                  error={taskEdit.touched.description && Boolean(taskEdit.errors.description)}
                  multiline
                  rows={4}
                  fullWidth
                />
              </div>
              <div className="input-block">
                <TextField
                  select
                  name="priority"
                  label="Prioridade"
                  variant="outlined"
                  value={taskEdit.values.priority}
                  onChange={taskEdit.handleChange}
                  error={taskEdit.touched.priority && Boolean(taskEdit.errors.priority)}
                  fullWidth
                >
                  <MenuItem value="Alta">Alta</MenuItem>
                  <MenuItem value="Média">Média</MenuItem>
                  <MenuItem value="Baixa">Baixa</MenuItem>
                </TextField>
              </div>
              <div className="input-block">
                <TheDatePicker
                  label="Data Limite"
                  value={limitDate}
                  onChange={(e) => setLimitDate(e)}
                  fullWidth
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <TheButton
              onClick={() => {
                setHandleEditTask(false);
                taskEdit.resetForm()
              }}>
              Cancelar
                </TheButton>
            <TheButton
              type="submit"
            >
              Salvar
              </TheButton>
          </DialogActions>
        </form>
      </DialogBox>

      {/* Concluir Tarefa */}
      <DialogBox
        open={handleCompleteTask}
        onClose={() => setHandleCompleteTask(false)}
        title={`Você deseja concluir ${currentTask.name}?`}
      >
        <div className="dialog-content">
          <DialogContent>
            <p>Ao clicar em confirmar, a tarefa será marcada como concluída.</p>
          </DialogContent>
        </div>
        <DialogActions>
          <TheButton
            onClick={() => {
              setHandleCompleteTask(false);
            }}>
            Cancelar
          </TheButton>
          <TheButton
            onClick={() => handleComplete()}
          >
            Confirmar
          </TheButton>
        </DialogActions>
      </DialogBox>
      {/* Excluir Tarefa */}
      <DialogBox
        open={handleDeleteTask}
        onClose={() => setHandleDeleteTask(false)}
        title={`Você deseja remover ${currentTask.name}?`}
      >
        <DialogContent>
          <div className="dialog-content">
            <p>Ao clicar em confirmar, a tarefa será removida permanentemente.</p>
          </div>
        </DialogContent>
        <DialogActions>
          <TheButton
            onClick={() => {
              setHandleDeleteTask(false);
            }}>
            Cancelar
                </TheButton>
          <TheButton
            onClick={() => handleDelete()}
          >
            Confirmar
              </TheButton>
        </DialogActions>
      </DialogBox>

    </div >
  )
}