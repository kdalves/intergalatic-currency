#include "Roman.h"

#include <boost/regex.hpp>

#include <boost/algorithm/string.hpp>

#include <boost/tokenizer.hpp>

#include <boost/lexical_cast.hpp>

#include <fstream>

#include <vector>

#include <string>

using namespace std;

using namespace boost::algorithm;

void Roman::intergalaxy_transaction(string& request)

{

//print the input

cout<<"INPUT: "<<request<<endl;

//Read the file and get the list of input string

vector<string> input_list = get_input_list();

//This credit list will store the key/value of Gold/Silver/Iron credit values

map<string,float> credit_list = get_credit_list(input_list);

//Generate output

string output_str = get_output(request,credit_list);

//print result

cout<<"OUTPUT: "<<output_str<<endl;

cout<<"============================================="<<endl;

}

map<string,float> Roman::get_credit_list(vector<string> &input_list)

{

//This base list will store key/value of glob=I,prok=V,pish=X and tegj=L

//map<string,string> base_list;

//Final list

map<string,float> credit_list;

//Apply rules

static const boost::regex rule1("^(glob|prok|pish|tegj){1}.* is{1} (I|V|X|L){1}$");

static const boost::regex rule2("^(glob|prok|pish|tegj){1}.* (glob|prok|pish|tegj){1}.* (Silver|Gold|Iron){1} .* Credits$");

//Build dict

for(int index=0;index<input_list.size();index++)

{

string input_str =input_list.at(index);

if ( true == regex_match(input_str,rule1))

{

string key= input_str.substr(0,4);

string value = input_str.substr(input_str.size()-1,input_str.size());

base_list[key] = value;

}

else if(true == regex_match(input_str, rule2))

{

float credit_value = 0.0;

if(input_str.find("Gold") != -1)

{

credit_value = get_credit_value(base_list,input_str);

credit_list["Gold"] = credit_value;

}

else if(input_str.find("Silver") != -1)

{

credit_value = get_credit_value(base_list,input_str);

credit_list["Silver"] = credit_value;

}

else if(input_str.find("Iron") != -1)

{

credit_value = get_credit_value(base_list,input_str);

credit_list["Iron"] = credit_value;

}

else

{

cout<<"Gold/Silver/Iron only currently allowed"<<endl;

}

}

else

{

cout<<"String Not Matched For Input, Please refer the format \""<<input_str<<"\""<<endl;

}

}

return credit_list;

}

string Roman::get_output(string &request,map<string,float> &credit_list)

{

//Output Format Rules

static const boost::regex rule1("^((how much is)?) ((pish|tegj|glob|prok|\\?)\\s?){0,}$");

static const boost::regex rule2("^((how many Credits is)?) ((pish|tegj|glob|prok)\\s?){0,}((Silver|Gold|Iron)\\s?){1}\\?$");

string final_output;

if ( true == regex_match(request,rule1))

{

string output_str = get_result(request);

final_output = output_str + "is " + boost::lexical_cast<std::string>(process_tokens(output_str));

}

else if(true == regex_match(request,rule2))

{

string output_str = get_result(request);

float credit_val = credit_list[find_credit_name(output_str)] * process_tokens(output_str);

final_output = output_str + " is " + boost::lexical_cast<std::string>(credit_val) + " Credits";

}

else

{

final_output = "I have no idea what you are talking about";

}

return final_output;

}

string Roman::find_credit_name(string &credit_name)

{

trim(credit_name);

int found = credit_name.find_last_of(" ");

return credit_name.substr(found+1);

}

int Roman::process_tokens(string &string_tokens)

{

typedef boost::tokenizer<boost::char_separator<char> > tokenizer;

boost::char_separator<char> sep(" ");

tokenizer tok(string_tokens,sep);

string temp_str;

for(tokenizer::iterator beg=tok.begin(); beg!=tok.end();++beg)

{

string t = string(*beg);

temp_str += base_list[t];

}

return convert_roman_to_number(temp_str);

}

string Roman::get_result(string &request)

{

int start = request.find(" is ");

int end = request.find("?");

string output_str = request.substr(start+3,(end-(start+3)));

return output_str;

}

float Roman::get_credit_value(map<string,string> &base_list,string &input_str)

{

string roman_value = base_list[input_str.substr(0,4)] + base_list[input_str.substr(5,4)];

int decimal_value = convert_roman_to_number(roman_value);

int start = input_str.find(" is ");

int end = input_str.find(" Credits");

string credit_value_str = input_str.substr(start+3,(end-(start+3)));

return (atof(credit_value_str.c_str())/decimal_value);

}

int Roman::convert_roman_to_number(string& input_str)

{

//Init the map

map<char,int> maplist = init_map();

//Trim the input;

trim(input_str);

//Check the given Rules

apply_rules(input_str);

//Convert Roman to number

return romanToNumber(input_str,maplist);

}

map<char,int> Roman::init_map()

{

map<char,int> mlist;

mlist['I'] =1;

mlist['V'] =5;

mlist['X'] =10;

mlist['L'] =50;

mlist['C'] =100;

mlist['D'] =500;

mlist['M'] =1000;

return mlist;

}

bool Roman::apply_rules(const string& str)

{

//Rule1: "I", "X", "C", and "M" 3 times allowed

//Rule2: "D", "L", and "V" shouldnt be repeated

static const boost::regex e("^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$");

if ( false == regex_match(str, e))

{

throw "Invalid Roman Input";

}

}

int Roman::romanToNumber(const string& input_str,map<char,int> &maplist)

{

int output_num = 0;

for(int i=0,j=1;j<=input_str.length();i++,j++)

{

if(maplist[input_str[i]] >= maplist[input_str[j]])

{

output_num += maplist[input_str[i]];

}

else if(maplist[input_str[i]]<maplist[input_str[j]])

{

output_num += maplist[input_str[j]] - maplist[input_str[i]];

i++;j++;

}

}

return output_num;

}

vector<string> Roman::get_input_list()

{

vector<string> list;

ifstream file("InputFile.txt");

string line;

while(getline(file, line))

{

list.push_back(line);

}

file.close();

return list;

}