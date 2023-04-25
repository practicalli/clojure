# Encoding and Decoding with Clojure

![Matrix decode](/images/matrix-decode.png)

Projects that use a range of ciphers, from simple to more complex, to encode and decode text.

A common approach to encoding and decoding text is to use a dictionary lookup, defined in Clojure as a hash-map. Each key-value pair provides a mapping for encoding and decoding.  Looking up a a character as a key in the map provides a value that is the encrypted character.

These projects show several ways to transform data in Clojure.

| Project                                              | Topics           | Description                                     |
|------------------------------------------------------|------------------|-------------------------------------------------|
| [Boolean names to 0 or 1](convert-boolean-values.md) | hash-map get     | Convert boolean values to classic 1 or 0 values |
| [Caesar cipher - ROT13](caesar-cipher rot13.md)      | seq cycle zipmap | A simple alphabet rotation cipher               |
| [RNA / DNA converter](rna-dna.md)                    |                  | Convert between DNA and RNA                     |
| [Clacks telegram](clacks.md)                         |                  | Encoding and decoding messages with Clacks      |

## Examples of Encoding

* [Portable Network Graphics for image compression](https://en.wikipedia.org/wiki/Portable_Network_Graphics)
* [Vorbis for music and video compression](https://en.wikipedia.org/wiki/Vorbis) plus several commercial compression encoders
* [Enigma machine - encrypted communications](https://www.google.com/search?q=clojure+enigma+machine)
