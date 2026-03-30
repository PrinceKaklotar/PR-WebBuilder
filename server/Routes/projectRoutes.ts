import express from 'express'
import { protect } from '../middlewares/auth';
import { deleteProject, getProjectById, getProjectPreview, getPublishedProject, makeRevision, rollbackToVersion, saveProjecCode } from '../controllers/projectController';

const projectRouter = express.Router();

projectRouter.post('/revision/:projectId',protect,makeRevision)
projectRouter.put('/save/:projectId',protect,saveProjecCode)
projectRouter.get('/rollback/:projectId/:versionId',protect,rollbackToVersion)
projectRouter.delete('/:projectId',protect,deleteProject)
projectRouter.get('/preview/:projectId', protect, getProjectPreview)
projectRouter.get('/published',getPublishedProject)
projectRouter.get('/published/:projectId', getProjectById)

export default projectRouter