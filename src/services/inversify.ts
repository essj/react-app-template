import { Container } from 'inversify';
import 'reflect-metadata';
import getDecorators from 'inversify-inject-decorators';

import baseUrl from '../config';
import Service from './service';
import {
	HistoryService,
} from '.';

const myContainer = new Container();

myContainer.bind(Service.History).to(HistoryService).inSingletonScope();
// Register things here.

const { lazyInject } = getDecorators(myContainer);

export { myContainer as Container, lazyInject };
