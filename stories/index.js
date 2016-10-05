import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import Label from 'components/label';
import Input from 'components/input';
import Slider from 'components/slider';
import Avatar from 'components/avatar';
import Alias from 'components/alias';
import Fieldset from 'components/fieldset';
import {Columns, Column} from 'components/grid';
import Fieldgroup from 'components/fieldgroup';
import Tree, {Dir, File} from 'components/file';

import Wallpaper from 'components/wallpaper';

require('./base.scss');

const CAvatar = Avatar(Wallpaper);
const CAlias = Avatar(Alias);

console.log(Alias, Avatar);

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('Slider', module) .add('slider test', () => (
    <Slider min={0} max={100}></Slider>
  ));

storiesOf('Grid', module)
  .add('Normal grid', () => (
    <Columns style={{maxWidth: '100%'}}>
      <Column>
        <img src="http://mila-kunis.4fans.net/de/wp-content/uploads/2015/07/003.png" />
      </Column>
      <Column>
        <img src="http://mila-kunis.4fans.net/de/wp-content/uploads/2015/07/003.png" />
      </Column>
      <Column>
        <img src="http://mila-kunis.4fans.net/de/wp-content/uploads/2015/07/003.png" />
      </Column>
    </Columns>
  ));

const sys = {
  path: 'a',
  dirs: [
    {
      path: 'b',
      dirs: [
        {
          path: 'c1',
          dirs: [
            {
              path: 'm',
              dirs: [],
              files: []
            },
            {
              path: 'f',
              dirs: [],
              files: []
            },
          ],
          files: [

            {
              name: 'test',
              meta: {
                mime: 'jpeg'
              }
            }
          ]
        },
        {
          path: 'c2',
          dirs: [
          ],
          files: [
            {
              name: 'die nutten',
              meta: {
                mine: 'text'
              }
            },
            {
              name: 'die nutten 2',
              meta: {
                mine: 'mov'
              }
            }
          ]
        }
      ],
      files: [

        {
          name: 'foo',
          meta: {
            mime: 'jpeg'
          }
        }
      ]
    }
  ],
  files: [
    {
      name: 'tata',
      meta: {
        mime: 'jpeg'
      }
    }
  ]
};
storiesOf('Filetree', module)
  .add('file tree test', () => (
    <div>
      <Tree treeData={sys} depth={0}>
      </Tree>
    </div>
  ));
storiesOf('Avatar', module)
  .add('avatar test', () => (
    <div>
      <CAvatar src='http://mila-kunis.4fans.net/de/wp-content/uploads/2015/07/003.png'></CAvatar>
      <hr/>
      <CAvatar diamond src='https://s-media-cache-ak0.pinimg.com/originals/ed/58/90/ed58907015b3f1a0ae4b14bb2fd9ada0.png'></CAvatar>
      <hr/>
      <CAvatar square src='https://pbs.twimg.com/profile_images/680013554682990593/CoOfIbhF.jpg'></CAvatar>
      <hr/>
      <CAlias square name='ass hole nation is fo'></CAlias>
      <hr/>
      <CAlias circle name='ass hole nation' alias='ah'></CAlias>
      <hr/>
      <CAlias circle size={96} name='ass hole nation' alias='ah'></CAlias>
    </div>
  ));

storiesOf('Input', module)
  .add('test', () => (
    <Fieldset label='not so sure'>
      <Fieldgroup>
        <Input type="text" label="Username or E-Mail" name="user" value="mail@thomas-appel.com">
        </Input>
        <div>this is your doom</div>
        <Input type="password" label="Password" name="mail">
          <div>this is your doom</div>
        </Input>
      </Fieldgroup>
    </Fieldset>
  ));

storiesOf('Wallpaper', module)
  .add('background image', () => (
    <Wallpaper src="http://mila-kunis.4fans.net/de/wp-content/uploads/2015/07/003.png">
      <div className="card">
        <form method="post">
          <label htmlFor="user">Username or Email</label>
          <input name="user" type="text"/>
          <label htmlFor="password">Password</label>
          <input name="password" type="password"/>
          <input type="submit" value="ok"/>
        </form>
      </div>
    </Wallpaper>
  ));
