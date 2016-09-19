<?php
namespace commands;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class GreetCommand extends Command
{
    protected $commandName = 'make:page';
    protected $commandDescription = "Greets Someone";

    protected $commandArgumentName = "name";
    protected $commandArgumentDescription = "Who do you want to greet?";

    protected $commandOptionName = "root"; // should be specified like "app:greet John --cap"
    protected $commandOptionDescription = 'If set, it will make tis page the root page';

    protected function configure(){
        $this
            ->setName($this->commandName)
            ->setDescription($this->commandDescription)
            ->addArgument(
                $this->commandArgumentName,
                InputArgument::OPTIONAL,
                $this->commandArgumentDescription
            )
            ->addOption(
                $this->commandOptionName,
                null,
                InputOption::VALUE_NONE,
                $this->commandOptionDescription
            );
    }
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $name = $input->getArgument($this->commandArgumentName);
        $setAsMain = false;
        if ($input->getOption($this->commandOptionName)) {
            $setAsMain = true;
        }
        $filename = $name;
        if (file_exists("app/pages/$filename/$filename.js")){
            $output->writeln("$name already exists.");
            die();
        }
        mkdir("app/pages/$filename");
        $fileContents = <<<EOD
(function(){
    'use strict';
    formelo.event().onCreate(function(){
        // Entry point of this application
    });

    formelo.event().onIntent(function(params){
        var data = params.detail;
        // Receive parameters from calling page
    });

    formelo.event().onClose(function(){
        // Override close button
        // formelo.navigation.stopPropagation()
    });
}());
EOD;
        $js = fopen("app/pages/$filename/$filename.js", "w");
        $css = fopen("app/pages/$filename/$filename.css", "w");
        $html = fopen("app/pages/$filename/$filename.html", "w");
        fwrite($js, $fileContents);
        // Update the json
        $pages = $this->getJSON();
        if ($pages->root === "" || $setAsMain){
            $pages->root = $filename;
        }
        array_push($pages->pages, $filename);
        $this->saveJSON($pages);

        $output->writeln("$name page has been created.");
    }
    private function getJSON(){
        $filename = "app/pages/pages.json";
        $handle = fopen($filename, "r");
        $contents = fread($handle, filesize($filename));
        fclose($handle);
        return json_decode($contents);
    }
    private function saveJSON($json){
        $filename = "app/pages/pages.json";
        $handle = fopen($filename, "w");
        fwrite($handle, json_encode($json));
        fclose($handle);
    }
}