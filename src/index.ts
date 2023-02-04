#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .commandDir('commands', { extensions: ['js', 'ts'] })
  .alias({ h: 'help', v: 'version' }).argv
