import React from 'react';
import { Route } from 'react-router-dom';

import { Dashboard } from './components/Dashboard';
import { ButtonDemo } from './components/ButtonDemo';
import { ChartDemo } from './components/ChartDemo';
import { Documentation } from './components/Documentation';
import { FileDemo } from './components/FileDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { ListDemo } from './components/ListDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { MiscDemo } from './components/MiscDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { PanelDemo } from './components/PanelDemo';
import { TableDemo } from './components/TableDemo';
import { TreeDemo } from './components/TreeDemo';
import { InvalidStateDemo } from './components/InvalidStateDemo';

import { Calendar } from './pages/Calendar';
import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';

import { DisplayDemo } from './utilities/DisplayDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { FlexBoxDemo } from './utilities/FlexBoxDemo';
import { GridDemo } from './utilities/GridDemo';
import { IconsDemo } from './utilities/IconsDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { TimelineDemo } from './utilities/TimelineDemo';



import {Users, UsersLazy, UsersCrud, UserCreate, CommentsCrud} from 'corso';


const Routes = () => (
  <div className="layout-main">
  <Route path="/" exact component={Dashboard} />
  <Route path="/formlayout" component={FormLayoutDemo} />
  <Route path="/input" component={InputDemo} />
  <Route path="/floatlabel" component={FloatLabelDemo} />
  <Route path="/invalidstate" component={InvalidStateDemo} />
  <Route path="/button" component={ButtonDemo} />
  <Route path="/table" component={TableDemo} />
  <Route path="/list" component={ListDemo} />
  <Route path="/tree" component={TreeDemo} />
  <Route path="/panel" component={PanelDemo} />
  <Route path="/overlay" component={OverlayDemo} />
  <Route path="/menu" component={MenuDemo} />
  <Route path="/messages" component={MessagesDemo} />
  <Route path="/file" component={FileDemo} />
  <Route path="/chart" component={ChartDemo} />
  <Route path="/misc" component={MiscDemo} />
  <Route path="/display" component={DisplayDemo} />
  <Route path="/elevation" component={ElevationDemo} />
  <Route path="/flexbox" component={FlexBoxDemo} />
  <Route path="/icons" component={IconsDemo} />
  <Route path="/grid" component={GridDemo} />
  <Route path="/spacing" component={SpacingDemo} />
  <Route path="/typography" component={TypographyDemo} />
  <Route path="/text" component={TextDemo} />
  <Route path="/calendar" component={Calendar} />
  <Route path="/timeline" component={TimelineDemo} />
  <Route path="/crud" component={Crud} />
  <Route path="/empty" component={EmptyPage} />
  <Route path="/documentation" component={Documentation} />

  <Route path="/users" component={Users} />
  <Route path="/users-lazy" component={UsersLazy} />
  <Route path="/users-crud" component={UsersCrud} />
  <Route path="/comments-crud" component={CommentsCrud} />
  </div>
)

export default Routes
